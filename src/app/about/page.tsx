import FaqComponent from "../../components/FaqComponent"
import OurTeamComponent from "../../components/OurTeamComponent"
import ProductPresentationComponent from "../../components/PoductComponent"


export default function About() {

  return (
    <>
      <div className="bg-yellow-300 min-h-screen p-8">
        {/* Product Presentation*/}
        <ProductPresentationComponent/>
        {/*Our Team Presentation*/ }
        <OurTeamComponent/>
        {/*FAQ*/ }
        <FaqComponent/>
      </div>
    </>
    
  )
}