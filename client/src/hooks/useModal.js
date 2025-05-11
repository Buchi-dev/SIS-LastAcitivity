import { useState } from 'react';

const useModal = (form) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  return {
    isModalVisible,
    editingItem,
    showModal,
    hideModal
  };
};

export default useModal;