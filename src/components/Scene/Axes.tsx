import { Line, Text } from "@react-three/drei";

export function Axes() {
  return (
    <>
      {/* East */}
      <Line
        points={[
          [0, 0, 0],
          [500, 0, 0],
        ]}
        color="red"
        lineWidth={3}
      />
      <Text
        position={[550, 0, 0]}
        fontSize={40}
        color="red"
      >
        E
      </Text>

      {/* North */}
      <Line
        points={[
          [0, 0, 0],
          [0, 0, 500],
        ]}
        color="blue"
        lineWidth={3}
      />
      <Text
        position={[0, 0, 550]}
        fontSize={40}
        color="blue"
      >
        N
      </Text>

    </>
  );
}