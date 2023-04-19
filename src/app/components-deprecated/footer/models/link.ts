export interface ILink {
  name: string;
  url?: string;
  filePath?: string;
  action?: () => void;
}
