export const getTimelineSpacing = (screenHeight) => {
  const offset = -120;
  const min = 440;
  const max = 860;
  const calculated = screenHeight + offset;

  return Math.max(min, Math.min(max, calculated));
};

export const getTimelineLayout = ({ width, projectCount, dotSpacing, isMobile }) => {
  const safeWidth = width || 800;
  const axisX = isMobile ? 44 : Math.min(safeWidth * 0.15, 40);
  const oppositeX = isMobile ? axisX : Math.max(safeWidth * 0.85, safeWidth - 40);
  const topLineOffset = -200;
  const bottomLineOffset = dotSpacing;
  const bottomPadding = isMobile ? 96 : 80;

  const realDots = Array.from({ length: projectCount }, (_, index) => ({
    cx: isMobile ? axisX : index % 2 === 0 ? axisX : oppositeX,
    cy: 120 + index * dotSpacing,
    align: isMobile ? "stacked" : index % 2 === 0 ? "left" : "right",
  }));

  const pseudoTop = realDots.length
    ? { cx: realDots[0].cx, cy: realDots[0].cy + topLineOffset }
    : null;
  const pseudoBottom = realDots.length
    ? {
        cx: realDots[realDots.length - 1].cx,
        cy: realDots[realDots.length - 1].cy + bottomLineOffset,
      }
    : null;
  const extendedDots =
    pseudoTop && pseudoBottom ? [pseudoTop, ...realDots, pseudoBottom] : [];

  const paths = [];
  for (let index = 0; index < extendedDots.length - 1; index += 1) {
    const dot = extendedDots[index];
    const next = extendedDots[index + 1];
    const startX = dot.cx;
    const startY = dot.cy;
    const endX = next.cx;
    const endY = next.cy;

    if (isMobile || startX === endX) {
      paths.push(`M ${startX} ${startY} L ${endX} ${endY}`);
      continue;
    }

    const totalDistY = endY - startY;
    const cornerY = startY + totalDistY - 76;

    paths.push(`
      M ${startX} ${startY}
      L ${startX} ${cornerY}
      L ${endX} ${cornerY}
      L ${endX} ${endY}
    `);
  }

  const containerHeight = extendedDots.length
    ? extendedDots[extendedDots.length - 1].cy + bottomPadding
    : 1000;

  return {
    axisX,
    oppositeX,
    realDots,
    paths,
    containerHeight,
  };
};

export const getTimelineProjectState = (projectIndex, visibleStep) => {
  if (visibleStep > projectIndex + 1) return "visited";
  if (visibleStep > projectIndex) return "current";
  return "upcoming";
};
