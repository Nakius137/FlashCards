import { auth } from "@/auth";
import SetCard from "@/components/SetCard";
import { Checkbox } from "@/components/ui/checkbox";
import { db } from "@/lib/prismaClient";

export default async function page() {
  const session = await auth();
  console.log(session!.user?.id);
  const sets = await db.set.findMany();
  console.log(sets);
  return (
    <>
      <div className="flex items-center space-x-2 text-white pt-2">
        <Checkbox className="border-white" id="sort" />
        <label
          htmlFor="sort"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show created by me
        </label>
      </div>
      <span className="pt-2"></span>
      <div className="grid grid-cols-3">
        {sets.map((set) => {
          return <SetCard name={set.Name} setid={set.id} />;
        })}
      </div>
    </>
  );
}
