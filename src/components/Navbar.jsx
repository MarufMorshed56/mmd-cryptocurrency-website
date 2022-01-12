import React, {useState, useEffect} from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import smCIcon from "../assets/smCIcon.jpg"
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons/lib/icons'

const Navbar = () => {

const [activeMenu, setActiveMenu] = useState(true)
const [screenSize , setScreenSize] = useState(null)

   useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);


console.log("screen", screenSize)
console.log("menu", activeMenu)
  return (
    <div className="Nav-container">
      <div className="logo-container">
        <img src={smCIcon} style={{width:"50px", height:"50px", borderRadius:"50%"}} />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crytocurency</Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={()=> setActiveMenu(!activeMenu)}>
            <MenuOutlined />
        </Button>
      </div>
      {activeMenu && 
      (<Menu  className='menu-container' theme="dark" >
          <Menu.Item  icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item  icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item  icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item  icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
      </Menu>)}
    </div>
  )
}

export default Navbar
