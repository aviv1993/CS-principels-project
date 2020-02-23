const SIMPLE_NODE = 0;
const START_NODE = 1;
const TARGET_NODE = 2;
const BLOCK_NODE = 3;
const ALGO_NODE = 4;
const PATH_NODE = 5;
const WEIGHTED_NODE = 6;

const nodeColors = [
  {
    explain: "Weighted Node",
    color: "lightsalmon",
    hover: true,
    type: WEIGHTED_NODE
  },
  { explain: "Blocking Node", color: "black", hover: true, type: BLOCK_NODE },
  { explain: "Algorithm Node", color: "blue", hover: false, type: ALGO_NODE },
  { explain: "Path Node", color: "yellow", hover: false, type: PATH_NODE },
  { explain: "Start Node", color: "green", hover: false, type: START_NODE },
  { explain: "Target Node", color: "red", hover: false, type: TARGET_NODE }
];
export {
  SIMPLE_NODE,
  START_NODE,
  TARGET_NODE,
  BLOCK_NODE,
  ALGO_NODE,
  PATH_NODE,
  WEIGHTED_NODE,
  nodeColors
};
