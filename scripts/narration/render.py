"""Render a balanced shard of the written editions with an open speech model."""
import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import tempfile
from pathlib import Path
from urllib.request import urlopen

ASSETS = {
    'kokoro-v1.0.int8.onnx': 'ae315a79b623f244700e4afb9246c46a26066782e049ba174bf3ba433970ee9c',
    'voices-v1.0.bin': 'bca610b8308e8d99f32e6fe4197e7ec01679264efed0cac9140fe9c29f1fbf7d',
}
def model_files(directory):
    directory.mkdir(parents=True,exist_ok=True)
    for name, checksum in ASSETS.items():
        p = directory/name
        if p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest() == checksum:
            continue
        url = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/'+name
        with urlopen(url,timeout=120) as download, tempfile.NamedTemporaryFile(dir=directory,delete=False) as src:
            shutil.copyfileobj(download,src)
        tmp=Path(src.name)
        if hashlib.sha256(tmp.read_bytes()).hexdigest() != checksum: raise ValueError(name)
        tmp.replace(p)

def spoken(text):
    words={'AGENTS.md':'agents dot em dee','NJIT':'N J I T','RAG':'rag','ETL':'E T L','SQL':'sequel',
           'GitHub':'Git Hub','FastAPI':'Fast A P I','SQLite':'S Q Lite','JSON':'Jay son','README.md':'read me dot em dee'}
    for key, value in words.items(): text = re.sub(r'\b'+re.escape(key)+r'\b',value,text)
    return text.strip()

def main():
    parser=argparse.ArgumentParser()
    for n in ['input','output','model-dir']: parser.add_argument('--'+n,type=Path,required=True)
    for n in ['shard','shards']: parser.add_argument('--'+n,type=int,required=True)
    a=parser.parse_args()
    groups=[[] for _ in range(a.shards)]; total=[0]*a.shards
    for p in sorted(a.input.glob('*.txt'), key=lambda f: (-f.stat().st_size,f.name)):
        i=total.index(min(total)); groups[i].append(p); total[i]+=p.stat().st_size
    a.output.mkdir(exist_ok=True,parents=True);result={}
    if groups[a.shard]:
        import numpy as np
        import onnxruntime as rt
        from kokoro_onnx import Kokoro
        model_files(a.model_dir)
        options=rt.SessionOptions();options.intra_op_num_threads=min(4,os.cpu_count() or 1);options.inter_op_num_threads=1
        session=rt.InferenceSession(str(a.model_dir/'kokoro-v1.0.int8.onnx'),sess_options=options,providers=['CPUExecutionProvider'])
        engine=Kokoro.from_session(session,str(a.model_dir/'voices-v1.0.bin'))
        for p in groups[a.shard]:
            print('Rendering',p.stem,flush=True)
            raw=p.read_bytes();path=a.output/(p.stem+'.mp3')
            args=['ffmpeg','-loglevel','error','-y','-f','f32le','-ac','1','-ar','24000','-i','pipe:0','-codec:a','libmp3lame','-b:a','56k','-ar','24000','-ac','1',str(path)]
            proc=subprocess.Popen(args,stdin=subprocess.PIPE);frames=0;peak=0
            try:
                for paragraph in re.split(r'\n\s*\n',raw.decode('utf-8')):
                    paragraph=spoken(paragraph)
                    if not paragraph: continue
                    samples,rate=engine.create(paragraph,voice='af_heart',lang='en-us',speed=1.0)
                    if rate!=24000 or not np.isfinite(samples).all(): raise ValueError(p)
                    if samples.size:
                        peak=max(peak,float(np.abs(samples).max()));frames+=len(samples)
                        proc.stdin.write(np.asarray(samples,dtype='<f4').tobytes())
                        proc.stdin.write(bytes(int(.20*24000)*4))
                proc.stdin.close()
                if proc.wait()!=0 or peak<.015 or frames<24000: raise ValueError(p)
            finally:
                if proc.poll() is None: proc.kill();proc.wait()
            secs=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(path)]))
            subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(path),'-f','null','-'],check=True)
            result[p.stem]={'seconds':round(secs,3),'sha256':hashlib.sha256(raw).hexdigest()}
    (a.output/f'manifest-{a.shard}.json').write_text(json.dumps(result,sort_keys=True)+'\n')
if __name__=='__main__': main()
