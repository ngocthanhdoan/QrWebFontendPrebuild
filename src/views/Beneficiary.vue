<template>
    <Fluid class="flex flex-col h-screen p-4">
        <!-- Header -->

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto">
            <div class="card p-4 bg-white rounded shadow-md">
                <!-- Title -->
                <div class="font-semibold text-xl mb-4">Thông tin Người thụ hưởng thứ nhất</div>

                <!-- Priority Section -->
                <div class="mb-4">
                    <div class="font-medium mb-2">Thứ tự ưu tiên</div>
                    <div class="flex gap-4">
                        <div class="priority-item">1</div>
                        <div class="priority-item">2</div>
                        <div class="priority-item">3</div>
                        <div class="priority-item">4</div>
                        <div class="priority-item">5</div>
                    </div>
                </div>

                <!-- Ratio Section -->
                <div class="mb-4">
                    <div class="font-medium mb-2">Tỉ lệ</div>
                    <div class="text-lg">100%</div>
                </div>

                <!-- Relationship Section -->
                <div class="mb-4">
                    <div class="font-medium mb-2">Quan hệ với Người được bảo hiểm</div>
                    <div>Bản thân</div>
                </div>

                <!-- Identification Section -->
                <div class="mb-4">
                    <div class="font-medium mb-2">Các loại chứng minh thư</div>
                    <div>Chứng minh thư</div>
                    <div class="mb-4">
                        <div class="font-medium mb-2">Tìm kiếm</div>
                        <div class="flex flex-col gap-2">
                            <FloatLabel>
                                <InputText id="idNumber" />
                                <label for="idNumber">Số chứng minh thư</label>
                            </FloatLabel>
                            <Button label="Tìm kiếm" icon="pi pi-search" class="w-full" />
                        </div>
                    </div>
                    <div class="font-medium mb-2">Ngày cấp</div>
                    <div>22/02/2000</div>
                    <div class="font-medium mb-2">Nơi cấp</div>
                    <div>ho chi minh</div>
                </div>

                <!-- Personal Information Section -->
                <div class="mb-4">
                    <div class="font-medium mb-2">Tên người thụ hưởng</div>
                    <div>KIM HOÀI BẢO</div>

                    <div class="font-medium mb-2">Quốc Tịch</div>
                    <div>VietNam</div>

                    <div class="font-medium mb-2">Khách hàng có số thị thực nhập cảnh</div>
                    <div>Miễn thị thực</div>

                    <div class="font-medium mb-2">Ngày sinh</div>
                    <div>31/12/1991</div>

                    <div class="font-medium mb-2">Giới tính</div>
                    <div>Nam</div>

                    <div class="font-medium mb-2">Số điện thoại</div>
                    <div>0903608919</div>

                    <div class="font-medium mb-2">Email</div>
                    <div>user27171@hotmail.com</div>
                </div>

                <!-- Address Section -->
                <div class="mb-4">
                    <div class="font-medium mb-2">Địa chỉ thường trú</div>
                    <div>Địa chỉ：hộ khẩu</div>

                    <div class="font-medium mb-2">Địa chỉ liên lạc</div>
                    <div>Địa chỉ thường trú</div>
                </div>

                <!-- Work Information Section -->
                <div class="mb-4">
                    <div class="font-medium mb-2">Tên công ty</div>
                    <div>Tên công ty</div>

                    <div class="font-medium mb-2">Chức vụ</div>
                    <div>Chức vụ</div>

                    <div class="font-medium mb-2">Nội dung nghề nghiệp</div>
                    <div>Nội dung nghề nghiệp</div>
                </div>

                <!-- Additional Fields -->
                <div class="mb-4">
                    <div class="font-medium mb-2">Địa chỉ</div>
                    <div>Điạ chỉ：hộ khẩu</div>

                    <div class="font-medium mb-2">Mã vùng</div>
                    <div>Mã vùng</div>

                    <div class="font-medium mb-2">Điện thoại công ty</div>
                    <div>Điện thoại công ty</div>

                    <div class="font-medium mb-2">Số máy nhánh</div>
                    <div>Số máy nhánh</div>
                </div>
            </div>
        </div>
    </Fluid>
</template>
<style scoped lang="scss">
/* Toàn bộ layout */
.Fluid {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 16px;
}

/* Card */
.card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
}

/* Priority Section */
.priority-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #f0f0f0;
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
}

/* Sections */
.font-medium {
    font-weight: 500;
    margin-bottom: 8px;
}

/* Float Label */
.float-label-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.float-label-container label {
    font-size: 0.9rem;
    color: #333;
}

.float-label-container input,
.float-label-container select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Footer */
.mt-4 {
    margin-top: 16px;
}
</style>
