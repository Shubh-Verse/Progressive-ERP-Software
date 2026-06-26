export function getCategory(description: string) {
    const text = description.toLowerCase();
  
    if (
      text.includes("aac") ||
      text.includes("autoclaved aerated")
    )
      return "AAC Block Masonry";
  
    if (
      text.includes("brick")
    )
      return "Brick Work";
  
    if (
      text.includes("paver") ||
      text.includes("interlocking")
    )
      return "Paver Block";
  
    if (
      text.includes("gypsum")
    )
      return "Gypsum Partition";
  
    if (
      text.includes("plinth protection")
    )
      return "Plinth Protection";
  
    if (
      text.includes("wash basin")
    )
      return "Wash Basin Opening";
  
    if (
      text.includes("door stopper")
    )
      return "Door Stopper";
  
    if (
      text.includes("hold fast")
    )
      return "Hold Fast";
  
    if (
      text.includes("tile")
    )
      return "Tile Work";
  
    if (
      text.includes("paint")
    )
      return "Painting Work";
  
    if (
      text.includes("waterproof")
    )
      return "Waterproofing";
  
    if (
      text.includes("plaster")
    )
      return "Plaster Work";
  
    if (
      text.includes("marble") ||
      text.includes("granite")
    )
      return "Marble Work";
  
    if (
      text.includes("road") ||
      text.includes("roller") ||
      text.includes("sub grade")
    )
      return "Road Work";
  
    if (
      text.includes("concrete")
    )
      return "Concrete Work";
  
    return "Miscellaneous Works";
  }

  export function getShortDescription(
    description: string
  ) {
    const text = description.toLowerCase();
  
    if (
      text.includes("aac")
    )
      return "AAC Block Masonry";
  
    if (
      text.includes("brick")
    )
      return "Brick Work";
  
    if (
      text.includes("tile")
    )
      return "Tile Work";
  
    if (
      text.includes("paint")
    )
      return "Painting Work";
  
    return description
      .split(" ")
      .slice(0, 4)
      .join(" ");
  }