import xml2js from 'xml2js';
import stripDelimiter from './string';

export default (xml) => {
  const parser = new xml2js.Parser({
    attrkey: 'attrData',
    charkey: 'charData',
    ignoreAttrs: false,
    normalizeTags: true,
    explicitArray: false,
    tagNameProcessors: [stripDelimiter],
    attrNameProcessors: [stripDelimiter],
  });

  return new Promise((resolve, reject) => {
    parser.parseString(xml, async (err, result) => {
      if (err) {
        reject(err);
      }

      if (result && result.rdf && result.rdf.ebook) {
        const {
          issued,
          subject,
          creator,
          attrData,
          language: lang,
          publisher = 'Project Gutenberg',
          title = null,
          rights = null,
        } = result.rdf.ebook;
        const id = attrData && attrData.about ? attrData.about.replace('ebooks/', '') : null;
        const author = creator && creator.agent && creator.agent.name ? creator.agent.name : null;
        const publicationDate = issued && issued.charData ? issued.charData : null;
        const language = lang
          && lang.description
          && lang.description.value
          && lang.description.value.charData
          ? lang.description.value.charData
          : null;
        const subjects = Array.isArray(subject)
          ? subject.map(sub => (
            sub.description
          && sub.description.value
              ? sub.description.value
              : null))
          : [];

        resolve({
          id,
          title,
          author,
          publisher,
          publicationDate,
          language,
          subjects,
          rights,
        });
      } else {
        resolve({});
      }
    });
  });
};
