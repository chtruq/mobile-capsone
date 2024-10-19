import { FC } from "react";
import Svg, { Path } from "react-native-svg";

interface BalconyDirectionIconProps {
  width: number;
  height: number;
}

const BalconyDirectionIcon: FC<BalconyDirectionIconProps> = ({
  width,
  height,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M20 14.0298L18.9898 15.264L10 7.90609L1.01107 15.2656L0 14.0298L10 5.84351L12.284 7.71302V5.31186H13.8804V9.01993L14.7836 9.75942V4.04389H16.3799V11.0667L17.2822 11.8056V2.51709H18.8785V13.1127L20 14.0298ZM7.23925 14.0911H9.50088V11.8296H7.23925V14.0911ZM10.4994 14.0911H12.761V11.8296H10.4994V14.0911ZM7.23925 17.483H9.50088V15.2215H7.23925V17.483ZM10.4994 17.483H12.761V15.2215H10.4994V17.483Z"
        fill="black"
      />
    </Svg>
  );
};

export default BalconyDirectionIcon;
