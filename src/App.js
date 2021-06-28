import './App.css';
import React from 'react'
import "monaco-editor";
import Editor from '@monaco-editor/react';


function createMathOptions() {
  return [
    {
        label: 'min',
        kind: global.monaco.languages.CompletionItemKind.Function,
        detail : "some detail here...",
        documentation: "go small",
        insertText: 'min(',
    },
    {
        label: 'max',
        kind: global.monaco.languages.CompletionItemKind.Function,
        documentation: "go big",
        insertText: 'max(',
    },
  ];
}

function createStringOptions() {
  return [
    {
        label: 'format',
        kind: global.monaco.languages.CompletionItemKind.Function,
        detail : "some detail here...",
        documentation: "go small",
        insertText: 'format(',
    },
    {
        label: 'length',
        kind: global.monaco.languages.CompletionItemKind.Function,
        documentation: "go big",
        insertText: 'length(',
    },
  ];
}


function globalProposals() {
  return [
    {
        label: 'math',
        kind: global.monaco.languages.CompletionItemKind.Module,
        documentation: "Some math crap",
        insertText: 'math',
    },
    {
      label: 'string',
      kind: global.monaco.languages.CompletionItemKind.Module,
      documentation: "Some string crap",
      insertText: 'string',
    },
    {
      label: 'function',
      kind: global.monaco.languages.CompletionItemKind.Keyword,
      documentation: "write a function",
      insertText: 'function(',
    },
    {
      label: 'end',
      kind: global.monaco.languages.CompletionItemKind.Keyword,
      documentation: "STOP IT!",
      insertText: 'end ',
    },
    {
      label: 'return',
      kind: global.monaco.languages.CompletionItemKind.Keyword,
      documentation: "go",
      insertText: 'return',
    },
];
}

function getLuaCompletionProvider(monaco)
{
  return {
    triggerCharacters:['.'],
    provideCompletionItems: function(model, position, context, token)
    {
      var word = model.getWordUntilPosition(position);
      position.column = position.column - 1;
      var prevAt = model.getWordAtPosition(position);
      var prevUntil = model.getWordUntilPosition(position);

      if(context.triggerKind === global.monaco.languages.CompletionTriggerKind.TriggerCharacter &&
         context.triggerCharacter === "." )
      {
        // get previous word
        position.column = position.column - 1;
        var prevWord = model.getWordAtPosition(position);
        if(prevWord.word === "math") return { suggestions : createMathOptions() };
        else if(prevWord.word === "string") return { suggestions : createStringOptions() };
        return { suggestions: [] };
      }
      if(context.triggerKind === global.monaco.languages.CompletionTriggerKind.Invoke && word.word === "")
      {
        return { suggestions : globalProposals() };
      }
      return { suggestions : globalProposals() };
    },
    resolveCompletionItem: function(item, token)
    {
      console.log("resolveCompletionItem")
    }
  }
}

class App extends React.Component {
  handleEditorDidMount(editor, monaco) {
    monaco.languages.registerCompletionItemProvider("lua", getLuaCompletionProvider(monaco));

  }
  editorWillMount(monaco) {
    monaco.languages.registerCompletionItemProvider("lua", getLuaCompletionProvider(monaco));

  }
  render() {
      return (
        <div style={{ boxSizing:'border-box', overflow:'hidden', width:'100%', height:'100vh' }} >
          <Editor
            language="lua"
            theme='vs-dark'
            value="function foo() return 'hey' end"
            onMount={this.handleEditorDidMount}
            />
        </div>
      );
  }
}

export default App;
