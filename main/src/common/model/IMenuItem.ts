
export interface IMenuItem {
  path: string,
  title?: string,
  // eslint-disable-next-line no-undef
  render?: (props: any) => JSX.Element;
  icon?: string,
  children?: IMenuItem[],
  exact?: boolean;
  internal?: boolean;
}
