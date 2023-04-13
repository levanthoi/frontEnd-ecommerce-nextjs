import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';

//

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded?: boolean;
  //   name?: string;
  value?: string;
}

const MyEditor: React.FC<CKeditorProps> = ({ onChange, editorLoaded, value }) => {
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            // console.log('edit', editor);
            const data = editor.getData();
            onChange(data);
          }}
          config={{
            // plugins: [SourceEditing],
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo',
              'code',
              'codeBlock',
              'exportPdf',
              'exportWord',
              'fontColor',
              'fontSize',
              'textPartLanguage',
              'sourceEditing',
              'htmlEmbed',
              'ckbox',
            ],
            language: 'en',
            image: {
              toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative'],
            },
            table: {
              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
            },
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
      <div />
    </>
  );
};

export default MyEditor;
