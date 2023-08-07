import Image from "next/image";
import { useEffect, useState } from "react";
import { useActive, useCommands } from "@remirror/react";
import IconButton from "@/components/iconButton";
import MainButton from "@/components/mainButton";
import { EmojiPopupComponent } from "@remirror/react";

import ClipIcon from "/public/icons/clip.svg";
import AtIcon from "/public/icons/at.svg";
import SmileIcon from "/public/icons/smile.svg";
import HeaderIcon from "/public/icons/header.svg";
import BoldIcon from "/public/icons/bold.svg";
import ItalicIcon from "/public/icons/italic.svg";
import CodeIcon from "/public/icons/code.svg";
import LinkIcon from "/public/icons/link.svg";
import NumListIcon from "/public/icons/num-list.svg";
import DotListIcon from "/public/icons/dot-list.svg";
import CheckListIcon from "/public/icons/check-list.svg";
import Todo from "/public/icons/todo.svg";
import Assignee from "/public/icons/assignee.svg";
import Priority from "/public/icons/priority.svg";
import Tags from "/public/icons/tags.svg";
import Project from "/public/icons/project.svg";
import Calendar from "/public/icons/calendar.svg";
import Cloud from "/public/icons/cloud.svg";
import Performance from "/public/icons/performance.svg";
import Stars from "/public/icons/stars.svg";

import { status, priority } from "@/utils/options";
import { trpc } from "@/utils/trpc";
import { Option } from "@/utils/interfaces";

interface MenuProps {
  submitHandler: any;
  recommendation: { projectName: string | null; tags: Array<string> };
  statusFetching: string;
}
const Menu = ({ submitHandler, recommendation, statusFetching }: MenuProps) => {
  const {
    toggleBold,
    toggleHeading,
    toggleCode,
    toggleItalic,
    toggleBulletList,
    toggleOrderedList,
    toggleTaskList,
    updateLink,
    insertText,
    removeLink,
    focus,
  } = useCommands();
  const active = useActive();

  const [data, setData] = useState<{
    users: Array<Option>;
    projects: Array<Option>;
    tags: Array<Option>;
  } | null>(null);

  const usersList = trpc.userList.useQuery().data!;
  const tagsList = trpc.tagList.useQuery().data!;
  const projectsList = trpc.projectList.useQuery().data!;

  useEffect(() => {
    setData({ users: usersList, projects: projectsList, tags: tagsList });
  }, [usersList, tagsList, projectsList]);

  const getStyle = (active: boolean) => {
    return {
      border: `0.5px solid ${active ? "grey" : "transparent"}`,
      borderRadius: "3px",
    };
  };

  const selectProject = () => {
    if (project?.name === recommendation.projectName) {
      setProject(undefined);
    } else {
      const existingProject = projectsList.find(
        (pr) => pr.name === recommendation.projectName
      );
      if (existingProject) {
        setProject(existingProject);
      }
    }
  };
  const selectTag = (name: string) => {
    const recommendedTag = tags.find((tag) => tag.name === name);
    if (recommendedTag) {
      setTags(tags.filter((tag) => tag.name !== name));
    } else {
      const tag = tagsList.find((tag) => tag.name === name);
      if (tag) {
        setTags([tag, ...tags]);
      }
    }
  };
  const [statusValue, setStatus] = useState<Option>();
  const [priorityValue, setPriority] = useState<Option>();
  const [assignee, setAssignee] = useState<Array<Option>>();
  const [project, setProject] = useState<Option>();
  const [tags, setTags] = useState<Array<Option>>([]);

  return (
    <div className="flex flex-col w-full mt-[24px]">
      {(recommendation?.projectName ||
        !!recommendation?.tags.length ||
        statusFetching === "loading") && (
        <div className="flex gap-2 pb-3 pl-6 flex-container">
          <Image src={Stars} alt="stars" height={20} width={20} />
          {statusFetching === "loading" && (
            <IconButton
              iconSrc={Performance}
              text="Loading..."
              borderType="dashed"
              fullWidth
              className="logger"
            />
          )}
          {recommendation?.projectName && (
            <IconButton
              iconSrc={Cloud}
              text={recommendation.projectName}
              borderType="dashed"
              onClick={selectProject}
              fullWidth
            />
          )}
          {recommendation.tags?.map((tag) => (
            <IconButton
              key={tag}
              iconSrc={Performance}
              text={tag}
              borderType="dashed"
              onClick={() => selectTag(tag)}
              fullWidth
            />
          ))}
        </div>
      )}
      <div className="flex gap-2 pb-[17px] pl-6">
        <IconButton
          iconSrc={Todo}
          text="Todo"
          options={status}
          setOptionValue={setStatus}
          size={14}
        />
        <IconButton
          iconSrc={Assignee}
          text="Assignee"
          options={data?.users || []}
          multiSelect
          setOptionValue={setAssignee}
        />
        <IconButton
          iconSrc={Priority}
          text="Priority"
          options={priority}
          setOptionValue={setPriority}
        />
        <IconButton
          iconSrc={Tags}
          text={tags.length ? tags.map((tag) => tag?.name).join(", ") : "Tags"}
          options={data?.tags || []}
          multiSelect
          setOptionValue={setTags}
          selected={tags.length ? tags.map((tag) => tag?.id) : []}
        />
        <IconButton
          iconSrc={Project}
          text="Project"
          options={data?.projects || []}
          setOptionValue={setProject}
          selected={project?.id ? [project.id] : []}
        />
        <IconButton iconSrc={Calendar} text="Due Date" borderType="solid" />
      </div>
      <hr className="border-[rgba(223, 225, 228, 0.60)]" />
      <div className="flex items-center	justify-between pl-6 pr-4 h-[65px]">
        <div className="flex gap-[11px] py-6">
          <EmojiPopupComponent />
          <button>
            <Image src={ClipIcon} alt="clip" width={18} height={18} />
          </button>
          <button>
            <Image src={AtIcon} alt="at" width={18} height={18} />
          </button>
          <button
            onClick={() => {
              insertText(":");
              focus();
            }}
          >
            <Image src={SmileIcon} alt="smile" width={18} height={18} />
          </button>

          <button
            style={getStyle(active.heading())}
            onClick={() => {
              toggleHeading({ level: 2 });
              focus();
            }}
          >
            <Image src={HeaderIcon} alt="header" width={18} height={18} />
          </button>
          <button
            style={getStyle(active.bold())}
            onClick={() => {
              toggleBold();
              focus();
            }}
          >
            <Image src={BoldIcon} alt="bold" width={18} height={18} />
          </button>
          <button
            style={getStyle(active.italic())}
            onClick={() => {
              toggleItalic();
              focus();
            }}
          >
            <Image src={ItalicIcon} alt="italic" width={18} height={18} />
          </button>
          <button
            style={getStyle(active.code())}
            onClick={() => {
              toggleCode();
              focus();
            }}
          >
            <Image src={CodeIcon} alt="code" width={18} height={18} />
          </button>
          <button
            style={getStyle(active.link())}
            onClick={() => {
              if (!active.link()) {
                const href = prompt("Insert link:") || "";
                updateLink({ href });
                focus();
              } else {
                removeLink();
              }
            }}
          >
            <Image src={LinkIcon} alt="link" width={18} height={18} />
          </button>
          <button
            style={getStyle(active.orderedList())}
            onClick={() => {
              toggleOrderedList();
              focus();
            }}
          >
            <Image src={NumListIcon} alt="num-list" width={18} height={18} />
          </button>
          <button
            style={getStyle(active.bulletList())}
            onClick={() => {
              toggleBulletList();
              focus();
            }}
          >
            <Image src={DotListIcon} alt="dot-list" width={18} height={18} />
          </button>
          <button
            style={getStyle(active.taskList())}
            onClick={() => {
              toggleTaskList();
              focus();
            }}
          >
            <Image
              src={CheckListIcon}
              alt="check-list"
              width={18}
              height={18}
            />
          </button>
        </div>
        <MainButton
          onClick={() =>
            submitHandler(tags, assignee, project, priorityValue, statusValue)
          }
        />
      </div>
    </div>
  );
};
export default Menu;
