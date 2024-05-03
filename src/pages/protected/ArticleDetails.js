import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ArticleDetails from '../../features/Articles/ArticleDetails'

function ArticleDetailsPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Article Details" }))
    }, [])

    return (
        <ArticleDetails />
    )
}

export default ArticleDetailsPage