import { getZoomMagnitude } from './scroll-and-zoom';

// This returns the width of the timeline, in pixels. As you zoom in, the width
// increases.
export function getTimelineWidth({
  timelineConfig,
  normalizedZoom,
  fractional = false,
} = {}) {
  const { viewportWidth } = timelineConfig;
  const zoomMagnitude = getZoomMagnitude({ timelineConfig, normalizedZoom });

  const fractionalWidth = zoomMagnitude * viewportWidth;

  return fractional ? fractionalWidth : Math.ceil(fractionalWidth);
}

// This is the number of "extra pixels" that are being rendered on the timeline
// due to the mismatch in resolution between pixels and frames at certain (nearly all)
// resolutions.
// As you zoom in further, the size of the dead space in fractional frames tends to 0.
// At low zoom levels, the size of the dead space can be in the tens or hundreds of frames, depending
// on the length of the content and width of the viewport, which is why dead space is important
// to be aware of.
// export function getDeadSpaceInFractionalFrames({
//   timelineConfig,
//   normalizedZoom,
// }) {

// }

// // This value will alway satisfy the inequality:  0 <= val < 1.
// // The reason for this is that the timeline will add at most 1 extra pixel to display all of the
// // frames in the video.
export function getTimelineDeadSpaceInPixels({
  timelineConfig,
  normalizedZoom,
}) {
  const fractionalTimelineWidth = getTimelineWidth({
    timelineConfig,
    normalizedZoom,
    fractional: true,
  });

  const renderedTimelineWidth = Math.ceil(fractionalTimelineWidth);

  return renderedTimelineWidth - fractionalTimelineWidth;
}
