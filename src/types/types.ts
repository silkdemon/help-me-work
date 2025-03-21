interface ToolCategory {
    name: string;
    value: string;
    tools: Tool[];
  }
  
  interface Tool {
    name: string;
    value: string;
    installCommand: string;
    hasVersion: boolean
  }