import React from "react";
import Day1 from "./course/Day1";
import Day2 from "./course/Day2";
import Day3 from "./course/Day3";
import Day4 from "./course/Day4";
import Day5 from "./course/Day5";
import Day6 from "./course/Day6";
import Day7 from "./course/Day7";
import Day8 from "./course/Day8";
import Day9 from "./course/Day9";
import Day10 from "./course/Day10";
import Day11 from "./course/Day11";
import Day12 from "./course/Day12";
import Day13 from "./course/Day13";
import Day14 from "./course/Day14";
import Day15 from "./course/Day15";
import Day16 from "./course/Day16";
import Day17 from "./course/Day17";
import Day18 from "./course/Day18";
import Day19 from "./course/Day19";
import Day20 from "./course/Day20";
import Day21 from "./course/Day21";
import Day22 from "./course/Day22";
import Day23 from "./course/Day23";
import Day24 from "./course/Day24";
import Day25 from "./course/Day25";
import Day26 from "./course/Day26";
import Day27 from "./course/Day27";
import Day28 from "./course/Day28";
import Day29 from "./course/Day29";
import CourseLanding from "./CourseLanding";

export default function CourseContent({ day, batchId, isAdmin }) {
  switch (day) {
    case 1:
      return <Day1 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 2:
      return <Day2 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 3:
      return <Day3 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 4:
      return <Day4 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 5:
      return <Day5 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 6:
      return <Day6 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 7:
      return <Day7 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 8:
      return <Day8 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 9:
      return <Day9 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 10:
      return <Day10 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 11:
      return <Day11 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 12:
      return <Day12 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 13:
      return <Day13 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 14:
      return <Day14 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 15:
      return <Day15 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 16:
      return <Day16 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 17:
      return <Day17 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 18:
      return <Day18 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 19:
      return <Day19 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 20:
      return <Day20 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 21:
      return <Day21 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 22:
      return <Day22 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 23:
      return <Day23 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 24:
      return <Day24 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 25:
      return <Day25 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 26:
      return <Day26 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 27:
      return <Day27 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 28:
      return <Day28 day={day} batchId={batchId} isAdmin={isAdmin} />;
    case 29:
      return <Day29 day={day} batchId={batchId} isAdmin={isAdmin} />;
    default:
      return <CourseLanding />;
  }
}
