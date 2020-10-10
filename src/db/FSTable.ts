type TData = string[];

export class FSTable {
  data: TData[] = [];
  constructor(public name: string) {
    //
  }

  clear = () => {
    this.data.length = 0;
  };

  add = (data: TData) => {
    this.data.push(data);
  };
}
