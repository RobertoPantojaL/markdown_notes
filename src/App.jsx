import  { useState, useCallback } from 'react';
import './App.css';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

function App() {
  const [markdown, setMarkdown] = useState('');

  const handleChange = useCallback((e) => {
    setMarkdown(e.target.value);
  }, []);

  const insertMarkdown = useCallback((symbol) => {
    setMarkdown((prev) => `${prev}${symbol}`);
  }, []);

  const getMarkdownPreview = useCallback((markdown) => {
    return { __html: md.render(markdown) };
  }, []);

  return (
    <div className="App">
      <div className="editor-container">
        <div className="toolbar">
          <button onClick={() => insertMarkdown('# ')}>H1</button>
          <button onClick={() => insertMarkdown('## ')}>H2</button>
          <button onClick={() => insertMarkdown('### ')}>H3</button>
          <button onClick={() => insertMarkdown('**bold**')}>Bold</button>
          <button onClick={() => insertMarkdown('*italic*')}>Italic</button>
          <button onClick={() => insertMarkdown('~~strikethrough~~')}>Strikethrough</button>
          <button onClick={() => insertMarkdown('`code`')}>Code</button>
          <button onClick={() => insertMarkdown('```\ncode block\n```')}>Code Block</button>
          <button onClick={() => insertMarkdown('- ')}>List</button>
          <button onClick={() => insertMarkdown('1. ')}>Numbered List</button>
          <button onClick={() => insertMarkdown('[link](url)')}>Link</button>
          <button onClick={() => insertMarkdown('![alt text](image-url)')}>Image</button>
          <button onClick={() => insertMarkdown('> ')}>Quote</button>
          <button onClick={() => insertMarkdown('---')}>Horizontal Rule</button>
        </div>
        <textarea
          className="editor"
          value={markdown}
          onChange={handleChange}
          placeholder="Escribe tus notas en Markdown aquí..."
        />
      </div>
      <div className="preview">
        <h2>Vista previa</h2>
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={getMarkdownPreview(markdown)}
        />
      </div>
    </div>
  );
}

export default App;
