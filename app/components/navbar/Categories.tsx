'use client';

import { usePathname, useSearchParams } from 'next/navigation';

// icons
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from '../CategoryBox';

// categories
export const categories = [
  {label: 'Beach', icon: TbBeach, description: 'This property is close to the beach!'},
  {label: 'Windmills', icon: GiWindmill, description: 'This property has windmills!'},
  {label: 'Modern', icon: MdOutlineVilla, description: 'This property is modern!'},
  {label: 'Countryside', icon: TbMountain, description: 'This property in the countryside!'},
  {label: 'Pools', icon: TbPool, description: 'This property has a pool!'},
  {label: 'Islands', icon: GiIsland, description: 'This property is on an island!'},
  {label: 'Lake', icon: GiBoatFishing, description: 'This property is close to a lake!'},
  {label: 'Skiing', icon: FaSkiing, description: 'This property has skiing activities!'},
  {label: 'Castles', icon: GiCastle, description: 'This property is in a castle!'},
  {label: 'Camping', icon: GiForestCamp, description: 'This property has camping activities!'},
  {label: 'Arctic', icon: BsSnow, description: 'This property is in the arctic!'},
  {label: 'Cave', icon: GiCaveEntrance, description: 'This property is in a cave!'},
  {label: 'Desert', icon: GiCactus, description: 'This property is in the desert!'},
  {label: 'Barn', icon: GiBarn, description: 'This property is in the barn!'},
  {label: 'Lux', icon: IoDiamond, description: 'This property is luxurious!'},
];

// categories component
// contains all categories under the search bar
const Categories = () => {
  // params
  const params = useSearchParams();
  // get category from params
  const category = params?.get('category');
  // pathname
  const pathname = usePathname();

  // if not on main page, return null
  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
      {categories.map((item, index) => (
        <CategoryBox
          key={item.label} 
          label={item.label}
          selected={item.label === category}
          icon={item.icon}
        />
      ))}
    </div>
  )
};

export default Categories;
