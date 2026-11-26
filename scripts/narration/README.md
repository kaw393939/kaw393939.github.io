# Narrated editions

The journal and Ordo Knowledge Lab pair the written article with an on-demand MP3. The audio uses a synthetic English narrator. The written edition carries exact commands, source URLs and original illustrations.

The **Build narrated editions** workflow extracts the journal and the pinned Lab from their rendered pages. It keeps headings, labeled tables and examples in reading order, compares their text with the media catalog, and renders changed readings. A content or Lab pin update on the main branch starts this process. It is also available through the workflow’s manual run button.

The independent `narrated-editions` branch stores the media, public indexes and integrity hashes. The publication build checks that the written and spoken editions match, then serves the recordings from `/listen/`. It keeps the existing edition live while replacements are being prepared. To change the voice or pronunciation rules across the publication, update the rendering recipe in `prepare.py` along with the renderer.

The player requests audio when a reader presses Play. The model runs on the build worker. Readers do not send article text to a speech service.
