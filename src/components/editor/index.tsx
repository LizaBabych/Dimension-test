import {
  BoldExtension,
  HeadingExtension,
  ItalicExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  CodeExtension,
  LinkExtension,
  EmojiExtension,
  PlaceholderExtension,
} from "remirror/extensions";

import { useRemirror, Remirror, ThemeProvider, Toolbar } from "@remirror/react";

import { AllStyledComponent } from "@remirror/styles/emotion";
import Menu from "@/components/menu";
import data from "svgmoji/emoji.json";

const extensions = () => [
  new HeadingExtension(),
  new BoldExtension({}),
  new ItalicExtension(),
  new EmojiExtension({ data, plainText: true }),
  new PlaceholderExtension({ placeholder: `Type : to insert emojis` }),
  new CodeExtension(),
  new BulletListExtension(),
  new OrderedListExtension(),
  new TaskListExtension(),
  new LinkExtension(),
];

const Editor = () => {
  const { manager, state } = useRemirror({
    extensions,
    content: "",
    selection: "end",
    stringHandler: "html",
  });

  return (
    <AllStyledComponent>
      <ThemeProvider>
        <Remirror
          placeholder="Describe this task"
          manager={manager}
          initialContent={state}
          autoRender="end"
        >
          <Toolbar>
            <Menu />
          </Toolbar>
        </Remirror>
      </ThemeProvider>
    </AllStyledComponent>
  );
};

export default Editor;
