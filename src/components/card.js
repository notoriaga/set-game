import { div, svg, path, defs, pattern, line } from '../lib/html';

const randomId = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
};

const createStripes = () =>
  defs(
    {},
    pattern(
      {
        id: randomId(),
        patternUnits: 'userSpaceOnUse',
        width: '10',
        height: '10'
      },
      line({
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '10'
      })
    )
  );

const shapes = {
  oval: () => {
    const stripes = createStripes();
    const id = stripes.children[0].attributes.id;
    return svg({ viewBox: '-3 -4 115 64' }, [
      stripes,
      path({
        class: 'shape oval',
        fill: `url(#${id})`,
        d: `M30 0
          L80,0
          C120,0 120,50 80,50
          L30 50
          C-10,50 -10,0 30,0
      `
      })
    ]);
  },
  squiggle: () => {
    const stripes = createStripes();
    const id = stripes.children[0].attributes.id;
    return svg({ viewBox: '-5 -4 115 64' }, [
      stripes,
      path({
        class: 'shape squiggle',
        fill: `url(#${id})`,
        d: `M0 30
          C0,0 33,0 50,12
          S70,20 85,8
          S105,10 103,26
          S90,70 60,45
          S30,50 16,55
          S00,40 0,30
      `
      })
    ]);
  },
  diamond: () => {
    const stripes = createStripes();
    const id = stripes.children[0].attributes.id;
    return svg(
      {
        viewBox: '-5 -2 115 64'
      },
      [
        stripes,
        path({
          class: 'shape diamond',
          fill: `url(#${id})`,
          d: 'M0 30 L50 0 L100 30 L50 60 Z'
        })
      ]
    );
  }
};

export default ({ id, shape, color, fill, number, onclick, selected }) => {
  return div(
    {
      class: `card ${color} ${fill}`,
      selected: selected,
      onclick: () => onclick({ id, shape, color, fill, number }),
      key: id
    },
    Array(number).fill(shapes[shape]())
  );
};
