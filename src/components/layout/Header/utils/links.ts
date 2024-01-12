interface IHeaderLinks {
  label: string;
  route: string;
}

export const HeaderLinks: IHeaderLinks[] = [
  {
    label: "Início",
    route: "#",
  },
  {
    label: "Produtos",
    route: "/products",
  },
  {
    label: "Ofertas",
    route: "offers",
  },
];
