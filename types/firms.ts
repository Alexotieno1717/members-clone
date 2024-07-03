export interface Firms {
    members?: (MembersEntity)[] | null;
  }
  export interface MembersEntity {
    id: string;
    name: string;
    registration_number: string;
  }