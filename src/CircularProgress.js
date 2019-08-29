import React from "react";
import PropTypes from "prop-types";
import MetricsPath from "art/metrics/path";
import { Surface, Shape, Path, Group } from "@react-native-community/art";

export default class CircularProgress extends React.Component {
  circlePath(cx, cy, r, startDegree, endDegree) {
    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(
      4,
      cx,
      cy,
      r,
      (startDegree * Math.PI) / 180,
      (endDegree * Math.PI) / 180,
      1
    );
    return p;
  }

  extractFill(fill) {
    return Math.min(100, Math.max(0, fill));
  }

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      style,
      rotation,
      linecap,
      children
    } = this.props;

    const fill = this.extractFill(this.props.fill);
    const backgroundPath = this.circlePath(
      size / 2,
      size / 2,
      size / 2 - width / 2,
      0,
      360 * 0.9999
    );
    const circlePath = this.circlePath(
      size / 2,
      size / 2,
      size / 2 - width / 2,
      0,
      (360 * 0.9999 * fill) / 100
    );
    const offset = size - width * 2;

    const childContainerStyle = {
      position: "absolute",
      left: width,
      top: width,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <View style={style}>
        <Surface width={size} height={size}>
          <Group rotation={rotation - 90} originX={size / 2} originY={size / 2}>
            {backgroundColor !== "transparent" && (
              <Shape
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth != null ? backgroundWidth : width}
              />
            )}
            <Shape
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeCap={linecap}
            />
          </Group>
        </Surface>
        {children && <View style={childContainerStyle}>{children(fill)}</View>}
      </View>
    );
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  linecap: PropTypes.string,
  children: PropTypes.func
};

CircularProgress.defaultProps = {
  tintColor: "black",
  backgroundColor: "#e4e4e4",
  rotation: 90,
  linecap: "butt"
};
