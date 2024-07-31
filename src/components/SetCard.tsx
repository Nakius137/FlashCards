import CustomButton from "./CustomButton";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function SetCard({
  name,
  setid,
}: {
  name: string;
  setid: number;
}) {
  return (
    <Card className="w-[300px] h-[100px] m-2">
      <CardHeader>
        {
          // handle too long name
        }
        <CardTitle className="text-center">{name}</CardTitle>
        <CustomButton
          text={"Check"}
          path={`/dashboard/${setid}`}
        ></CustomButton>
      </CardHeader>
    </Card>
  );
}
