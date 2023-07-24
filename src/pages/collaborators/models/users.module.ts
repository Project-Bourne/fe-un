export interface TableBodyDataModel {
  id: number;
  name: string;
  type: string;
  designation: string;
  status: string;
}

export interface ActivityCardModel {
  id?: number;
  docId: any;
  actionText: string;
  activityText: string;
  time: string;
}

export interface HeaderModel {
  filter?: boolean;
  showModal?: boolean;
}

export interface LogDataModel {
  date: string;
  id: number;
  data: ActivityCardModel[];
}

export interface PersonalInformationModel {
  blockUser?: () => void;
}
