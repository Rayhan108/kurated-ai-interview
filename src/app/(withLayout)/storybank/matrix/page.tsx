import { CreateStory } from "./components/create-story";
import { CreateStroyModal } from "./components/create-story-modal";
import InterviewMatrix from "./components/intervew-matrix";

const data = [1];
function MatrixPage() {
  return (
    <div >
      {data.length ? <InterviewMatrix /> : <CreateStory />}
      <CreateStroyModal />
    </div>
  );
}

export default MatrixPage;
