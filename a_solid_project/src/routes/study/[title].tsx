import { useParams } from "@solidjs/router";

export default function StudyPage() {
  const params = useParams();
  return <div>Stak  {params.title}</div>;
}