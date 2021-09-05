import React from 'react';
import "./FileText.scss";
import {CKEditor} from 'ckeditor4-react';


const FileText = () => {
    const [editorValue, setEditorValue] = React.useState<string>('');


    return (
        <>
            <div className={"textArea"}>
                <CKEditor
                    value={editorValue}
                    onChange={() => setEditorValue}
                    initData={<p>{editorValue}</p>}
                />
            </div>
        </>
    )
}

export default FileText;