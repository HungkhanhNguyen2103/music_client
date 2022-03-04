import { Input, message } from 'antd';



const { Search } = Input;

interface Props {
    accessToken : string
}

export const SearchPage = (props : Props) => {

    const onSearch = async(value : any) =>{
        // console.log(value);
        // const search = await getSearch(props.accessToken,value,20,'VN')
        const hide = message.loading('', 0);
        // Dismiss manually and asynchronously
          setTimeout(hide, 600);
          setTimeout(() => {
                window.location.href ='/search/q=' + value
                   
          }, 850);
        
        
    }

    return (
        <Search
        placeholder="Nhập tên bài hát cần tìm kiếm..."
        onSearch={onSearch}
        />
    )
}