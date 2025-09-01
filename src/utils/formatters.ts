interface ToolResponseProps {
  content: {
    type: "text";
    text: string;
  }[];
}

export function toolResponse(message: string): ToolResponseProps {
  return {
    content: [
      {
        type: "text",
        text: message,
      },
    ],
  };
}
