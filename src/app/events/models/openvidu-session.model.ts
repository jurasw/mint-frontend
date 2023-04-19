export interface IOpenviduSession {
  id: string;
  createdAt: number;
  recording: boolean;
  customSessionId: string;
  connections: {
    numberOfElements: number;
    content: IOpenviduConnection[]
  };
}

export interface IOpenviduSessionData {
  numberOfElements: number;
  content: IOpenviduSession[];
}

export interface IOpenviduSessionBody {
  customSessionId: string;
  defaultRecordingProperties?: Partial<IDefaultRecordingProperties>;
}

export interface IOpenviduConnection {
  id: string;
  status: 'pending' | 'active';
  createdAt: number;
  activeAt: number;
  token: string;
  sessionId: string;
  record: boolean;
  role: 'PUBLISHER' | 'SUBSCRIBER';
}

export interface IDefaultRecordingProperties {
  name: string;
  hasAudio: boolean;
  hasVideo: boolean;
  outputMode: string;
  recordingLayout: string;
  resolution: string;
  frameRate: number;
  shmSize: number;
}

export interface IOpenviduConnectionData {
  record: boolean;
  role: 'PUBLISHER' | 'SUBSCRIBER' | 'MODERATOR';
}

export interface IRecordingData {
  session: string;
  name: string;
}

export interface IRecording {
  id: string;
  object: string;
  name: string;
  outputMode: string;
  hasAudio: boolean;
  hasVideo: boolean;
  resolution: string;
  frameRate: number;
  recordingLayout: string;
  customLayout: string;
  sessionId: string;
  createdAt: number;
  size: number;
  duration: number;
  url: string;
  status: string;
}
