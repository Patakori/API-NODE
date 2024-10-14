import { IBaseModel } from "@/domain/interfaces/i-base-model";

export class BaseModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: IBaseModel) {
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.id = props.id;
  }

  formatDate(): string {
    if (!this.createdAt) {
      throw new Error("createdAt is required");
    }
    return this.createdAt.toISOString();
  }

  formatUpdatedAt(): string {
    if (!this.updatedAt) {
      throw new Error("updatedAt is required");
    }
    return this.updatedAt.toISOString();
  }
}
