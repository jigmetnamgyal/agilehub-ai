"use client";

import React, { useEffect, useMemo } from "react";
import mermaid from "mermaid";
import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  EdgeChange,
  Node,
  NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Connection,
  Edge,
  MiniMap,
} from "reactflow";
import { CustomNode } from "./custom-node";
import { parseMermaidCode } from "../_utils/mermaid-utils";
import "reactflow/dist/style.css";

interface DiagramProps {
  mermaidCode?: string;
  isComplete?: boolean;
}

const Diagram = ({ mermaidCode = "" }: DiagramProps) => {
  useEffect(() => {
    async function parse() {
      const { nodes, edges } = await parseMermaidCode(mermaidCode);
      setEdges(edges);
      setNodes(nodes);
    }
    if (mermaidCode) {
      parse();
    }
  }, [mermaidCode]);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const nodeTypes = useMemo(
    () => ({
      startEvent: CustomNode,
      endEvent: CustomNode,
      activity: CustomNode,
    }),
    [],
  );

  return (
    <ReactFlow
      className="w-full h-full"
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      fitView
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <MiniMap />
      <Controls />
      <Background variant={"dots" as any} gap={12} size={1} />
    </ReactFlow>
  );
};

export default Diagram;
