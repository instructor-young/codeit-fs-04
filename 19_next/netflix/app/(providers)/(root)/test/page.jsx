import Button from "@/components/Button";

function TestPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-4">
      <Button size="sm" intent="primary">
        작은 크기 Primary 버튼
      </Button>
      <Button size="md" intent="secondary">
        중간 크기 Secondary 버튼
      </Button>
      <Button size="lg" intent="white">
        큰 크기 White 버튼
      </Button>
      <Button>네 번째 버튼</Button>
      <Button>다섯 번째 버튼</Button>
    </div>
  );
}

export default TestPage;
