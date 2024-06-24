import Frame from "./Frame";
import { InningType } from "../gql/graphql";

interface InningProps {
  inning: InningType;
  selectedFrameId: number | null;
  setSelectedFrameId: (frameId: number | null) => void;
}
const Inning: React.FC<InningProps> = ({
  inning,
  selectedFrameId,
  setSelectedFrameId,
}) => {
  return (
    <tr>
      <td className="text-center">{inning.number}</td>
      <Frame
        frame={inning.topFrame}
        selectedFrameId={selectedFrameId}
        setSelectedFrameId={setSelectedFrameId}
      />
      <Frame
        frame={inning.bottomFrame}
        selectedFrameId={selectedFrameId}
        setSelectedFrameId={setSelectedFrameId}
      />
    </tr>
  );
};

export default Inning;
