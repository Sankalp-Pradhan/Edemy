import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [allCourses, setAllCourses] = useState([])
    const [isEduactor, setIsEduactor] = useState(true)
    // Fetch all Courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    //function to calculate average ratiing of a course
    const calculateRating =(course)=>{
        if(course.courseRatings.length === 0){
            return 0
        }
        let TotalRating =0
        course.courseRatings.forEach(rating => {
            TotalRating +=rating.rating
        });
        return TotalRating /course.courseRatings.length
    }

    useEffect(() => {
        fetchAllCourses()
    }, [])

    const value = {
        currency, allCourses, navigate , calculateRating , isEduactor, setIsEduactor
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
