import Gravity, { MatterBody } from "@/components/ui/gravity"

export default function Preview() {
  return (
    <div className="w-full h-dvh flex flex-col relative font-azeretMono bg-white border overflow-hidden">
      <Gravity gravity={{ x: 0, y: 1 }}> {/* Removed w-32 h-32 */}
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="20%"
          y="10%"
        >
          <div className="text-xs sm:text-sm md:text-base bg-[#0015ff] text-white rounded-full hover:cursor-pointer px-2 py-1 inline-block">
            react
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="25%"
          y="30%"
        >
          <div className="text-xs sm:text-sm md:text-base bg-[#e794da] text-white rounded-full hover:cursor-grab px-2 py-1 inline-block">
            typescript
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="35%"
          y="20%"
          angle={10}
        >
          <div className="text-xs sm:text-sm md:text-base bg-[#1f464d] text-white rounded-full hover:cursor-grab px-2 py-1 inline-block">
            motion
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="65%"
          y="10%"
        >
          <div className="text-xs sm:text-sm md:text-base bg-[#ff5941] text-white rounded-full hover:cursor-grab px-2 py-1 inline-block">
            tailwind
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="70%"
          y="20%"
        >
          <div className="text-xs sm:text-sm md:text-base bg-[#f97316] text-white rounded-full hover:cursor-grab px-2 py-1 inline-block">
            drei
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="45%"
          y="10%"
        >
          <div className="text-xs sm:text-sm md:text-base bg-[#ffd726] text-white rounded-full hover:cursor-grab px-2 py-1 inline-block">
            matter-js
          </div>
        </MatterBody>
      </Gravity>
    </div>
  )
}
