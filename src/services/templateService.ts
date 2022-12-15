export interface template {
  name: string;
  logoPath: string;
  color: string;
  sponsors?: {
    name: string;
    url: string;
    logoPath: string;
  }[];
}
export default class templateService {
  static async get(
    templateApiUrl: string,
    domain: string
  ): Promise<template | null> {
    try {
      const options = {
        method: 'GET',
      };

      const response = await fetch(templateApiUrl, options);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const templates = await response.json();

      if (templates.data) {
        const currenTemplate = templates.data?.find(
          (tpl: { identity: { domains: string[] } }) =>
            tpl?.identity?.domains?.includes(domain)
        );
        if (currenTemplate) {
          const name = currenTemplate?.identity?.name;
          const logo = currenTemplate?.images?.find(
            (image: { Id: string }) => image?.Id == 'logo'
          );
          const color =
            currenTemplate?.colors?.find(
              (color: { Id: string }) => color?.Id == 'light-grey'
            )?.hexa ?? '#cecece';
          const sponsors = currenTemplate?.sponsors?.map((sponsor: any) => {
            return sponsor?.logo?.path
              ? {
                  name: sponsor.name,
                  url: sponsor.url,
                  logoPath: sponsor?.logo?.path,
                }
              : null;
          });
          if (logo && color) {
            const template: template = {
              name: name,
              logoPath: logo?.path ?? '',
              color: color,
            };
            if (sponsors) template.sponsors = sponsors;
            return template;
          } else {
            console.error('Incorrect template datas', logo, color);
          }
        } else {
          console.error('No template found for ' + domain, templates.data);
        }
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error(err, templateApiUrl);
      return null;
    }
    return null;
  }
}
