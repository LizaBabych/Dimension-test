import Image from "next/image";
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

const Menu = () => {
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

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  const getStyle = (active: boolean) => {
    return {
      border: `0.5px solid ${active ? "grey" : "transparent"}`,
      borderRadius: "3px",
    };
  };

  return (
    <div className="flex flex-col w-full mt-[24px]">
      <div className="flex gap-2 pb-3 pl-6">
        <Image src={Stars} alt="stars" height={20} width={20} />
        <IconButton iconSrc={Cloud} text="Cloud" />
        <IconButton iconSrc={Performance} text="Performance" />
      </div>
      <div className="flex gap-2 pb-[18px] pl-6">
        <IconButton
          iconSrc={Todo}
          text="Todo"
          options={options}
          borderType="solid"
        />
        <IconButton
          iconSrc={Assignee}
          text="Assignee"
          options={options}
          borderType="solid"
          multiSelect
        />
        <IconButton
          iconSrc={Priority}
          text="Priority"
          options={options}
          borderType="solid"
        />
        <IconButton
          iconSrc={Tags}
          text="Tags"
          options={options}
          multiSelect
          borderType="solid"
        />
        <IconButton
          iconSrc={Project}
          text="Project"
          options={options}
          borderType="solid"
        />
        <IconButton iconSrc={Calendar} text="Due Date" borderType="solid" />
      </div>
      <hr className="border-[rgba(223, 225, 228, 0.60)]" />
      <div className="flex items-center	justify-between pl-6 pr-4">
        <div className="flex gap-3 py-6 w-full">
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
                const href = prompt("Insert link:");
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
        <MainButton />
      </div>
    </div>
  );
};
export default Menu;
