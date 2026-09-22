import imgImageSandP from "./583807724b86d07a16503e7117efd79409667b02.png";

function ImageSandP() {
  return (
    <div className="absolute h-[326px] left-[-0.5px] top-[-297.3px] w-[374px]" data-name="Image (SandP)">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgImageSandP} />
        <div className="absolute bg-[rgba(60,154,255,0.4)] inset-0 mix-blend-soft-light" />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[19.5px] left-[89.25px] top-[363.3px] w-[373.992px]" data-name="Link">
      <ImageSandP />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[385.102px] left-[17px] right-[17px] top-[51px]" data-name="Heading 1">
      <Link />
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 absolute h-[475.332px] left-1/2 top-0 w-[526px]">
      <p className="absolute left-[260px] top-[83px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        1
      </p>
      <p className="absolute left-[437px] top-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        4
      </p>
      <p className="absolute left-[505px] top-[58px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        5
      </p>
      <p className="absolute left-[510px] top-[205px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        7
      </p>
      <p className="absolute left-[478px] top-[263px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        8
      </p>
      <p className="absolute left-[441px] top-[321px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        9
      </p>
      <p className="absolute left-[390px] top-[376px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        10
      </p>
      <p className="absolute left-[326px] top-[430px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        11
      </p>
      <p className="absolute left-[7px] top-[58px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        19
      </p>
      <p className="absolute left-[56px] top-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        20
      </p>
      <p className="absolute left-[190px] top-[7px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        22
      </p>
      <p className="absolute left-[223px] top-[39px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        23
      </p>
      <p className="absolute left-[260px] top-[134px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        24
      </p>
      <p className="absolute left-[134px] top-[-1px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        21
      </p>
    </div>
  );
}

function Love() {
  return (
    <div className="[word-break:break-word] absolute font-['SF_Pro:Regular',sans-serif] font-normal h-[483px] leading-[16px] left-[33.75px] text-[#ff70ff] text-[12px] top-[24px] w-[538px] whitespace-nowrap" data-name="love">
      <Frame />
      <p className="absolute left-[266px] top-[467px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        12
      </p>
      <p className="absolute left-[199px] top-[426px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        13
      </p>
      <p className="absolute left-[139px] top-[375px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        14
      </p>
      <p className="absolute left-[36px] top-[258px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        16
      </p>
      <p className="absolute left-[6px] top-[206px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        17
      </p>
      <p className="absolute left-0 top-[133px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        18
      </p>
      <p className="absolute left-[89px] top-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        15
      </p>
      <p className="absolute left-[530px] top-[129px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        6
      </p>
      <p className="absolute left-[309px] top-[39px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        2
      </p>
      <p className="absolute left-[369px] top-[7px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        3
      </p>
    </div>
  );
}

export default function Header() {
  return (
    <div className="relative size-full" data-name="Header">
      <Heading />
      <Love />
    </div>
  );
}