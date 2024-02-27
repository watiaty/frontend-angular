export class Word {
  id!: string;
  word: string = "";
  transcription?: string;
  hashtags?: String[];
  translations!: String[];
  status: boolean = true;
  lang?: String;
}
