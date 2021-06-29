import './App.css';
import React from 'react'
import Editor from '@monaco-editor/react';

function getLuaCompletionProvider(monaco) {
  return {
    triggerCharacters: ["."],
    provideCompletionItems: function (model, position, context, token) {
      if (context.triggerKind === global.monaco.languages.CompletionTriggerKind.Invoke) {
        return { suggestions: [] };
      }
      return {
        suggestions: [
          {
            label: 'math',
            kind: global.monaco.languages.CompletionItemKind.Module,
            documentation: "Some math stuff",
            insertText: 'math',
          },
          {
            label: 'string',
            kind: global.monaco.languages.CompletionItemKind.Module,
            documentation: "Some string stuff",
            insertText: 'string',
          },
        ]
      };
    },
    resolveCompletionItem: function (item, token) {
    }
  }
}

function editorWillMount(monaco) {
  monaco.languages.registerCompletionItemProvider("lua", getLuaCompletionProvider(monaco));
}

class App extends React.Component {

  render() {
    return (
      <div style={{ boxSizing: 'border-box', overflow: 'hidden', width: '100%', height: '100vh' }} >
        <Editor
          language="lua"
          theme='vs-dark'
          value="function foo() return 'hey' end"
          beforeMount={editorWillMount}
        />
      </div>
    );
  }
}

export default App;
