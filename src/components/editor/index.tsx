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
import { prosemirrorNodeToHtml } from "remirror";

import { useRemirror, Remirror, ThemeProvider, Toolbar } from "@remirror/react";

import { AllStyledComponent } from "@remirror/styles/emotion";
import Menu from "@/components/menu";
import data from "svgmoji/emoji.json";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import useDebounce from "@/utils/useDebounce";
import { Priority, TaskStatus } from "@/utils/interfaces";

const extensions = () => [
  new HeadingExtension(),
  new BoldExtension({}),
  new ItalicExtension(),
  //@ts-ignore
  new EmojiExtension({ data, plainText: true }),
  new PlaceholderExtension({ placeholder: `Type : to insert emojis` }),
  new CodeExtension(),
  new BulletListExtension(),
  new OrderedListExtension(),
  new TaskListExtension(),
  new LinkExtension(),
];
interface EditorProps {
  title: string;
}

const Editor = ({ title }: EditorProps) => {
  const { manager, state, setState } = useRemirror({
    extensions,
    content: "",
    selection: "end",
    stringHandler: "html",
  });

  const mutation = trpc.openAI.useMutation();
  const taskMutation = trpc.taskCreate.useMutation();
  const [recommendation, setRecommendation] = useState<{
    projectName: string | null;
    tags: Array<string>;
  }>({
    projectName: null,
    tags: [],
  });
  const [description, setDescription] = useState("");

  const tagsList = trpc.tagList.useQuery().data!;
  const projectsList = trpc.projectList.useQuery().data!;

  const submitHandler = async (
    tags: Array<{ id: number }>,
    assignee: Array<{ id: number }>,
    project: { id: number },
    priority: { name: string },
    status: { name: string }
  ) => {
    if (description && title && status && assigneeId && projectId && priority) {
      taskMutation.mutate({
        name: title,
        description,
        status: (status?.name || "BACKLOG") as TaskStatus,
        priority: (priority?.name || "LOW") as Priority,
        projectId: project?.id,
        assigneeId: assignee?.map((user) => user?.id)[0],
        tagsOnTasks: tags?.map((tag) => tag.id),
      });
    }
  };

  const debouncedSearchChange = useDebounce(description, 2000);

  useEffect(() => {
    if (title && description) {
      mutation.mutate({ title, description });
    }
  }, [debouncedSearchChange]);

  useEffect(() => {
    const replaceName = (name: string) => {
      return name.replaceAll(" ", "").toLowerCase();
    };

    if (mutation.data) {
      const projectName = projectsList?.find(
        (project) =>
          replaceName(project.name) === replaceName(mutation.data.projectName)
      );
      const tags = tagsList?.filter((tag) =>
        mutation.data.tags
          .map((item: string) => replaceName(item))
          .includes(replaceName(tag.name))
      );
      setRecommendation({
        projectName: projectName?.name || null,
        tags: tags.map((item) => item.name),
      });
    }
  }, [mutation.data, projectsList, tagsList]);

  return (
    <AllStyledComponent>
      <ThemeProvider>
        <Remirror
          placeholder="Describe this task"
          manager={manager}
          initialContent={state}
          autoRender="end"
          onChange={(e) => {
            setState(e.state);
            const htmlStr = prosemirrorNodeToHtml(state.doc);
            setDescription(htmlStr);
          }}
        >
          <Toolbar>
            <Menu
              submitHandler={submitHandler}
              recommendation={recommendation}
            />
          </Toolbar>
        </Remirror>
      </ThemeProvider>
    </AllStyledComponent>
  );
};

export default Editor;
