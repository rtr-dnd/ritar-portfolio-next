import { NextPage } from "next";
import styles from '../../styles/placeholder/placeholder.module.css'
import categoryStyles from '../../styles/placeholder/category.module.css'
import { useRouter } from "next/router";

const PlaceholderCategory: NextPage = () => {
  const router = useRouter()
  const {category} = router.query
  return (
    <div className={styles.wrap}>
      {category}
    </div>
  )
}

export default PlaceholderCategory