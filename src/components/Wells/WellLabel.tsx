import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
};

export function WellLabel({ name, position }: Props) {
  return (
    <Text
      position={[position[0], position[1] + 40, position[2]]}
      fontSize={18}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {name}
    </Text>
  );
}