import { v4 as uuidV4 } from "uuid"

export class FileStorageService {
  makeKey(): string {
    return uuidV4()
  }
}
