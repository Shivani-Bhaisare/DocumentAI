import Navbar from '../../Components/Navbar'
import Landingpage from '../../Components/Landingpage'
import CoreFeatures from '../../Components/Corefeatures'
import HowItWorks from '../../Components/HowItWorks'
import AIOCRSection from '../../Components/AIOCRSection'
import WorkflowAutomation from '../../Components/WorkflowAutomation'
import OrganisationTeamManagement from '../../Components/OrganisationTeamManagement'
import SecurityGovernance from '../../Components/SecurityGovernance'
import BusinessUseCases from '../../Components/BusinessUseCases'
import DocumentToAction from '../../Components/DocumentToAction'
import WhyDocuCoreAI from '../../Components/WhyDocuCoreAI'
import PricingSection from '../../Components/PricingSection'
import FooterSection from '../../Components/FooterSection'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Landingpage/>
      <CoreFeatures/>
      <HowItWorks/>
      <AIOCRSection/>
      <WorkflowAutomation/>
      <OrganisationTeamManagement/>
      <SecurityGovernance/>
      <BusinessUseCases/>
      <DocumentToAction/>
      <WhyDocuCoreAI/>
      <PricingSection/>
      <FooterSection/>
    </div>
  )
}

export default Home
